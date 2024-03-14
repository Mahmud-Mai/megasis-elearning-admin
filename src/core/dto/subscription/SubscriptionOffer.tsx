export default interface SubscriptionOffer {
    id: string;
    period : number;
    title : string;
    description: string;
    price: number;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}