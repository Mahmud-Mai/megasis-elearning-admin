export default interface UpdateSubscriptionOfferRequest {
    subscriptionId: string;
    title: string;
    description: string;
    price: number;
    period: number;
    active: boolean;
}