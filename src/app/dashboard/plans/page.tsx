"use client"
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import {
    createSubscriptionOffer, deleteSubscriptionOffer,
    getSubscriptionOffers,
    updateSubscriptionOffer
} from "@/core/services/subscription-service";
import SubscriptionOffer from "@/core/dto/subscription/SubscriptionOffer";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"


export default function Plans() {
    const router = useRouter();

    const [refresher, setRefresher] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [loading, setLoading] = useState(false);
    // plan
    const [plans, setPlans] = useState<SubscriptionOffer[]>([]);
    // fields
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [period, setPeriod] = useState(1);
    const [active, setActive] = useState(false);


    // functions
    const loadPlans = () => {
        getSubscriptionOffers()
            .then(
                (subscriptionOffers) => {
                    setPlans(subscriptionOffers);
                }
            ).catch((err) => {
                console.log("Unable to load offers")
                setPlans([]);
            })
    }

    const addNewPlan = () => {
        setLoading(true);
        createSubscriptionOffer({ title, description, price, period, active })
            .then((res) => setRefresher(!refresher))
            .then(() => setLoading(false))
            .catch((err) => {
                console.log("Unable to save offer")
                setLoading(false);
                setPlans([]);
            })
    }

    const updatePlan = () => {
        setLoading(true);
        updateSubscriptionOffer({ subscriptionId: id, title, description, price, period, active })
            .then((res) => setRefresher(!refresher))
            .then(() => setLoading(false))
            .catch((err) => {
                console.log("Unable to save offer")
                setLoading(false);
                setPlans([]);
            })
    }

    const deletePlan = () => {
        deleteSubscriptionOffer({ subscriptionId: id })
            .then((res) => setRefresher(!refresher)).catch((err) => {
                console.log("Unable to delete offer")
                setPlans([]);
            })
    }

    const editPlan = (plan: SubscriptionOffer) => {
        setId(plan.id);
        setTitle(plan.title);
        setDescription(plan.description);
        setPrice(plan.price);
        setPeriod(plan.period);
        setActive(plan.active);
        setUpdating(true);
        // setShow(true);
    }

    useEffect(() => {
        loadPlans();
    }, [refresher]);

    return (
        <div className="container p-3">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Add New Subscription Offer </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Subscription Offer</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <input value={id} type="hidden" className="form-control" id="customFile" />
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Title</Label>
                            <Input
                                id="title"
                                defaultValue="Pedro Duarte"
                                className="col-span-3"
                                value={title} onChange={(e) => setTitle(e.target.value)}
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">Description</Label>
                            <Textarea
                                id="description"
                                className="col-span-3"
                                value={description} onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">Price</Label>
                            <Input
                                id="price"
                                className="col-span-3"
                                value={price}
                                onChange={(e) => setPrice(parseFloat(e.target.value))}
                                type="number"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="period" className="text-right">Period (Months)</Label>
                            <Input
                                id="period"
                                className="col-span-3"
                                value={period}
                                onChange={(e) => setPeriod(parseInt(e.target.value))}
                                type="number"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="active" className="text-right">Active </Label>
                            <Checkbox checked={active} onCheckedChange={() => setActive(!active)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button disabled={loading} onClick={() => updating ? updatePlan() : addNewPlan()} type="submit" >{loading ? "Saving..." : "Save"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Table>
                <TableCaption>A list of Subscription Offers.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>period</TableHead>
                        <TableHead>Active</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {plans.map((plan, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{plan.title}</TableCell>
                            <TableCell>{plan.description}</TableCell>
                            <TableCell>{plan.price}</TableCell>
                            <TableCell>{plan.period} Months</TableCell>
                            <TableCell>
                                <div style={{ height: "15px", width: "15px", borderRadius: "50%", backgroundColor: plan.active ? "green" : "red" }}></div>
                            </TableCell>
                            <TableCell>
                                <Button variant="secondary" onClick={() => editPlan(plan)} >Edit</Button>
                                <Button variant="destructive" onClick={() => deletePlan()} >Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div >
    )
}