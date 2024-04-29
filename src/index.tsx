import { createRoot } from 'react-dom/client';
import { ERKENNINGEN_GRAPHQL_API_URL, ERKENNINGEN_SITE_TYPE } from '@erkenningen/config/dist/index';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { App } from './App';
import { ThemeContext, ThemeBureauErkenningen } from '@erkenningen/ui/layout/theme';

const cache = new InMemoryCache({});

const client = new ApolloClient({
  link: new HttpLink({
    uri: ERKENNINGEN_GRAPHQL_API_URL,
    credentials: 'include',
  }),
  cache,
});

const container = document.getElementById('erkenningen-module-study-progress');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <ApolloProvider client={client}>
    <ThemeBureauErkenningen>
      <ThemeContext.Provider value={{ mode: ERKENNINGEN_SITE_TYPE as 'content' | 'admin' }}>
        <App />
      </ThemeContext.Provider>
    </ThemeBureauErkenningen>
  </ApolloProvider>,
);