export default interface CreateSubscriptionOfferRequest {
    title: string;
    description: string;
    price: number;
    period: number;
    active: boolean;
}