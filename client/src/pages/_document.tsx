import axios from 'axios';
import matcher from 'matcher';
import { ServerStyleSheet } from 'styled-components';
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import { User } from '../interfaces';
import { routesConfig } from '../config';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    const req: any = ctx.req;
    const authUser = await getAuthUser(req && req.cookies && req.cookies.token);

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) =>
            function EnhanceAppComponent(props: any) {
              // Handle protected pages
              const protectedRoutes = Object.keys(routesConfig.protected);
              const protectedRoute = protectedRoutes.find((r) =>
                matcher.isMatch(props.router.asPath.replace(/\/?$/, '/'), r)
              );

              if (protectedRoute) {
                const allowedUserRoles = routesConfig.protected[protectedRoute];

                const canUserAccessCurrentPage = authUser && allowedUserRoles.includes(authUser.role || 'guest');
                if (!canUserAccessCurrentPage) {
                  ctx.res?.writeHead(302, { Location: authUser ? '/' : '/auth/login' }).end();
                  return null;
                }
              }

              /** Handle guest pages */
              const guestRoutes = routesConfig.guest;
              const guestRoute = guestRoutes.find((r) => matcher.isMatch(props.router.asPath.replace(/\/?$/, '/'), r));

              if (guestRoute && authUser) {
                ctx.res?.writeHead(302, { Location: '/' }).end();
                return null;
              }

              /** Assign extra pageProps and return the App component */
              props.pageProps.authUser = authUser;
              return sheet.collectStyles(<App {...props} />);
            },
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export const getAuthUser = async (token: string): Promise<User | null> => {
  if (!token) return null;

  try {
    const { data } = await axios.get(`${process.env.APP_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data.user;
  } catch (error: any) {
    console.error(error.message);

    return null;
  }
};
