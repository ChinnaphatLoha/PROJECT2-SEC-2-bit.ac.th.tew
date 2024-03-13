import { reactive, computed } from "vue";

function FeedbackManagement(newfeedbacks) {
    const feedbacks = reactive(newfeedbacks);

    const addFeedback = (user, content) => {
        const newFeedback = {user,content}
        feedbacks.push(newFeedback);
        console.log(feedbacks);
    }

    const listFeedbacks = () =>{
        return feedbacks
    }
    return { addFeedback, listFeedbacks }
}

export default FeedbackManagement