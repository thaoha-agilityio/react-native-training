import {PropsWithChildren, ReactElement} from 'react';
import {render, renderHook} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const AllTheProviders = ({
  children,
  withQueryClient = false,
}: PropsWithChildren<{withQueryClient?: boolean}>) => {
  return withQueryClient ? (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  ) : (
    <>{children}</>
  );
};

const customRender = (
  ui: ReactElement,
  {
    withQueryClient = false,
    createNodeMock,
  }: {
    withQueryClient?: boolean;
    createNodeMock?: (element: React.ReactElement) => any;
  } = {},
) =>
  render(ui, {
    wrapper: ({children}) => (
      <AllTheProviders withQueryClient={withQueryClient}>
        {children}
      </AllTheProviders>
    ),
    createNodeMock,
  });

const customRenderHook = <T,>(hook: () => T, {withQueryClient = false} = {}) =>
  renderHook<T, unknown>(hook, {
    wrapper: ({children}: PropsWithChildren) => (
      <AllTheProviders withQueryClient={withQueryClient}>
        {children}
      </AllTheProviders>
    ),
  });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render, customRenderHook as renderHook};
