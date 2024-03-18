import { reactive } from "vue";

const feedbackManagement = (initialFeedbacks) => {
    const value = reactive({
        feedbackRecords: initialFeedbacks
    });

    const action = {
        addFeedback(type, content, username) {
            value.feedbackRecords[type].push({ content, username })
        },
        
        listFeedbacks(){
            return value.feedbackRecords;
        }
    }
    return { value, action };
}

export default feedbackManagement