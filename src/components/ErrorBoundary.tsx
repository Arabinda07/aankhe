/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldWarning } from '@phosphor-icons/react/dist/csr/ShieldWarning';
import { SoftButton } from './SoftButton';

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
        <div className="min-h-screen flex items-center justify-center bg-ankahe-bg p-6">
          <div className="paper-card max-w-md w-full p-8 space-y-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-ankahe-danger-soft text-ankahe-danger">
              <ShieldWarning size={36} weight="light" />
            </div>
            <div className="space-y-2">
              <h2 className="type-artifact-heading text-ankahe-heading">Something went wrong</h2>
              <p className="type-caption text-ankahe-muted">
                We encountered an unexpected error while composing your manual.
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
