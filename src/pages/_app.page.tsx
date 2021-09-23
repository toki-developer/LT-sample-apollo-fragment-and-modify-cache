import "/src/styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { apolloClient } from "src/apollo/apolloClient";

const App = (props: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <props.Component {...props.pageProps} />
    </ApolloProvider>
  );
};

export default App;
