import { FC } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "../ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const DashboardDialog: FC = () => {
    return (
        <div className="mt-6 lg:mt-0">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className="bg-sky-600 hover:bg-sky-900 rounded-lg text-base"
                        size="lg"
                    >
                        <Plus className="h-7 w-7 mr-2" />
                        Create New Interview
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Interview</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 mt-2">
                        <Input placeholder="Interview Title" />
                        <Input placeholder="Category" />
                    </div>

                    <DialogFooter className="mt-6 space-x-2">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button className="bg-sky-600 text-white">Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DashboardDialog