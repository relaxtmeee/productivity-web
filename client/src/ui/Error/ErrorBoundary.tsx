import React, { Component, ErrorInfo, ReactNode } from "react";
import HTag from "../Htag/HTag";
import icon from './error.svg';
import styles from './ErrorBoundary.module.css';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}

export const ErrorMessage = () => {
    return (
        <div className={styles.error}>
            <img className={styles.image} src={icon} alt='error'/>
            <HTag htag="h3">Something going wrong</HTag>
        </div>
    )
}

export default ErrorBoundary;