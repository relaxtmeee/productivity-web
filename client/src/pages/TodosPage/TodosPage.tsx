import React, { Suspense } from "react";
import ErrorBoundary from "../../ui/Error/ErrorBoundary";
import Spinner from "../../ui/Spinner/Spinner";
import Todos from "./modules/components/Todos/Todos";

const TodosPage = () => {
    return (
        <>
            <ErrorBoundary>
                <Suspense fallback={<Spinner />}>
                    <Todos />
                </Suspense>
            </ErrorBoundary>
        </>
    );
};

export default TodosPage;