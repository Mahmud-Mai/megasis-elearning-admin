export default interface SubscriptionBought {
    id: string;
    period : number;
    price: number;
    userId : string;
    stripeCustomerId : string;
    active: boolean;
    expireDate: string;
    createdAt: string;
    updatedAt: string;
}