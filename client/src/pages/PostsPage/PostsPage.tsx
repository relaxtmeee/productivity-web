import React, { Suspense } from 'react';
import ErrorBoundary from "../../ui/Error/ErrorBoundary";
import Spinner from '../../ui/Spinner/Spinner';

const Posts = React.lazy(() => import("./modules/components/Posts/Posts"));

const PostsPage: React.FC = () => {

    return (
        <>
            <ErrorBoundary>
                <Suspense fallback={<Spinner />}>
                    <Posts />
                </Suspense>
            </ErrorBoundary>
            
        </>
    );
};

export default PostsPage;