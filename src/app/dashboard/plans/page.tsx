"use client";
import { useState, useEffect, MouseEventHandler } from "react";
import {
  createSubscriptionOffer,
  deleteSubscriptionOffer,
  getSubscriptionOffers,
  updateSubscriptionOffer
} from "@/core/services/subscription-service";
import SubscriptionOffer from "@/core/dto/subscription/SubscriptionOffer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import PageHeading from "@/components/reusables/PageHeading";
import { GoPencil } from "react-icons/go";
import { IoTrashOutline } from "react-icons/io5";
import DialogTriggerBtn from "@/components/reusables/DialogTriggerBtn";
import PrimarySpinner from "@/components/reusables/PrimarySpinner";

export default function Plans() {
  const [refresher, setRefresher] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState<boolean>(false);
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
      .then((subscriptionOffers) => {
        setPlans(subscriptionOffers);
        setTimeout(() => setState("success"), 2000);
      })
      .catch((err) => {
        console.log("Unable to load offers");
        setPlans([]);
        setState("error");
        setErrorMessage("Unable to load offers. Try again!");
      });
  };

  const addNewPlan = () => {
    createSubscriptionOffer({ title, description, price, period, active })
      .then((res) => {
        alert("Created Plan successfylly!");
        setRefresher(!refresher);
      })
      .then(() => {
        setShowForm(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to create Plan");
        setLoading(false);
      });

    setLoading(false);
  };

  const updatePlan = () => {
    updateSubscriptionOffer({
      subscriptionId: id,
      title,
      description,
      price,
      period,
      active
    })
      .then((res) => {
        alert("Updated Plan successfylly!");

        setRefresher(!refresher);
      })
      .then(() => {
        setShowForm(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Unable to save offer");
        setLoading(false);
      });
  };

  const deletePlan = async (
    subscriptionId: string
  ): Promise<MouseEventHandler<HTMLButtonElement> | undefined> => {
    try {
      const result = await deleteSubscriptionOffer(subscriptionId);
      console.log("🚀 ~ Plans ~ result:", result);
      if (result) {
        alert("Plan deleted successfully!");
        setRefresher(!refresher);
      } else {
        alert("Unable to delete Plan");
      }
    } catch (error) {
      alert("An error occurred while deleting the Plan");
      console.error(error);
    }
    return;
  };

  const editPlan = (plan: SubscriptionOffer) => {
    setId(plan.id);
    setTitle(plan.title);
    setDescription(plan.description);
    setPrice(plan.price);
    setPeriod(plan.period);
    setActive(plan.active);
    setUpdating(true);
    setShowForm(true);
  };

  useEffect(() => {
    loadPlans();
  }, [refresher]);

  return (
    <div className="container p-16 h-full">
      <h1 className="text-left my-4 text-2xl uppercase font-bold">
        Subscription Plans
      </h1>
      <PageHeading>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <DialogTriggerBtn>Add New Subscription Offer</DialogTriggerBtn>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Subscription Offer</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <input
                value={id}
                type="hidden"
                className="form-control"
                id="customFile"
              />
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="name@example.com"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  className="col-span-3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  className="col-span-3"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  type="number"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="period" className="text-right">
                  Period (Months)
                </Label>
                <Input
                  id="period"
                  className="col-span-3"
                  value={period}
                  onChange={(e) => setPeriod(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="active" className="text-right">
                  Active{" "}
                </Label>
                <Checkbox
                  checked={active}
                  onCheckedChange={() => setActive(!active)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogTriggerBtn
                disabled={loading}
                onClick={() => (updating ? updatePlan() : addNewPlan())}
              >
                {loading ? "Saving..." : "Save"}
              </DialogTriggerBtn>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeading>

      {state === "loading" && (
        <div className="flex justify-center">
          <PrimarySpinner />
        </div>
      )}
      {state === "error" && (
        <div className="text-red-500 py-4 text-center">
          Error: {errorMessage}
        </div>
      )}
      {state === "success" && plans.length === 0 && (
        <div className="py-4 w-full text-center">
          You have not created any plans.
        </div>
      )}
      {state === "success" && plans.length !== 0 && (
        <Table className="border border-slate-200 rounded-md p-2">
          <TableHeader>
            <TableRow className="odd:bg-gray-100 hover:!bg-slate-200">
              <TableHead className="py-3  font-bold text-lg text-[#333] capitalize">
                Title
              </TableHead>
              <TableHead className="py-3  font-bold text-lg text-[#333] capitalize">
                Description
              </TableHead>
              <TableHead className="py-3  font-bold text-lg text-[#333] capitalize">
                Price
              </TableHead>
              <TableHead className="py-3  font-bold text-lg text-[#333] capitalize">
                period
              </TableHead>
              <TableHead className="py-3  font-bold text-lg text-[#333] capitalize">
                Active
              </TableHead>
              <TableHead className="py-3  font-bold text-lg text-[#333] capitalize">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-500">
            {plans.map((plan, index) => (
              <TableRow
                className="odd:bg-gray-100 hover:!bg-slate-200"
                key={index}
              >
                <TableCell className="p-2 font-medium">{plan.title}</TableCell>
                <TableCell className="p-2">{plan.description}</TableCell>
                <TableCell className="p-2">{plan.price}</TableCell>
                <TableCell className="p-2">{plan.period} Months</TableCell>
                <TableCell className="p-2 text-center">
                  <div
                    style={{
                      height: "15px",
                      width: "15px",
                      borderRadius: "50%",
                      backgroundColor: plan.active ? "green" : "red"
                    }}
                  ></div>
                </TableCell>
                <TableCell className="p-2">
                  <div className="flex space-x-8 items-center">
                    <button onClick={() => editPlan(plan)}>
                      <GoPencil
                        size={22}
                        className="text-blue-950 hover:scale-125 duration-300 ease-in-out"
                      />
                    </button>
                    <button onClick={() => deletePlan(plan.id)}>
                      <IoTrashOutline
                        size={22}
                        className="text-red-800 hover:scale-125 duration-300 ease-in-out"
                      />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
