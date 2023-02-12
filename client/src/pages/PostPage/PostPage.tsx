import ErrorBoundary from "../../ui/Error/ErrorBoundary";
import Post from "./modules/components/Post/Post";

const PostPage = () => {


    
    return (
        <>
            <ErrorBoundary>
                <Post/>
            </ErrorBoundary>
            
        </>
    );
};

export default PostPage;