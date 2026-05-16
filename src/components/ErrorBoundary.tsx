/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldWarning } from '@phosphor-icons/react/dist/csr/ShieldWarning';
import { SoftButton } from './SoftButton';
import { BrandIllustration } from './BrandIllustration';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  declare readonly props: Readonly<Props>;

  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    window.location.hash = '';
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-parichay-bg p-6">
          <div className="paper-card max-w-md w-full p-8 space-y-6 text-center">
            <div className="space-y-2">
              <BrandIllustration name="corrupt-url" className="mx-auto h-36 w-auto" />
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-parichay-danger-soft text-parichay-danger">
                <ShieldWarning size={32} weight="light" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="type-artifact-heading text-parichay-heading">Something went wrong</h2>
              <p className="type-caption text-parichay-muted">
                Something broke while putting your intro together.
                Your data in the URL might be corrupted, or memory state failed.
              </p>
            </div>
            <div className="pt-4 flex flex-col gap-3">
              <SoftButton onClick={this.handleReset} variant="primary" className="w-full">
                Reset and start over
              </SoftButton>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
