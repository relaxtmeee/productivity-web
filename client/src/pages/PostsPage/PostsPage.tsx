import ErrorBoundary from "../../ui/Error/ErrorBoundary";
import Posts from "./modules/components/Posts/Posts";

const PostsPage: React.FC = () => {

    return (
        <>
            <ErrorBoundary>
                <Posts />
            </ErrorBoundary>
            
        </>
    );
};

export default PostsPage;