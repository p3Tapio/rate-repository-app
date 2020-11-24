import { useMutation } from '@apollo/react-hooks';
import { REVIEW } from '../graphql/mutations';


const useReview = () => {
    const [mutate, result] = useMutation(REVIEW);

    const review = async ({ repositoryName, ownerName, rating, text }) => {
        rating = parseInt(rating);
        const res = await mutate({ variables: { repositoryName, ownerName, rating, text } });
        return { res };
    };
    return [review, result];
};

export default useReview; 
