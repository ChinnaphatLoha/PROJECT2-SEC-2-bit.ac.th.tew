class FeedbackManagement {
    constructor(feedbacks) {
        this.feedbacks = feedbacks
    }

    addFeedback(content, user) {
        const newFeedback = { content, user }
        this.feedbacks.push(newFeedback)
    }
}

export default FeedbackManagement