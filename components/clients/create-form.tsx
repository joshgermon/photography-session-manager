'use client';

import { Button } from "@/components/ui/button"
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
import { useState } from "react";
import { useForm } from "react-hook-form"

function removeEmptyFields(data: {[key: string]: any}) {
    Object.keys(data).forEach(key => {
        if (data[key] === '' || data[key] == null) {
            delete data[key];
        }
    });
}

export function ClientForm() {
    const {register, handleSubmit} = useForm();
    const [open, setOpen] = useState(false);

    async function createCustomer(data: any) {
        removeEmptyFields(data);
        const createCustomer = await fetch('/api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if(createCustomer.ok) {
            setOpen(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create Customer</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[485px]">
                <DialogHeader>
                    <DialogTitle>Create new Customer</DialogTitle>
                    <DialogDescription>
                        Create a new customer. Click save when you are done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(createCustomer)} id="customer-form" className="flex flex-col gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="first-name">
                            First Name
                        </Label>
                        <Input id="first-name" placeholder="Pedro" {...register('firstName')}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="last-name">
                            Last Name
                        </Label>
                        <Input id="last-name" placeholder="Duarte" {...register('lastName')} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">
                            Email Address
                        </Label>
                        <Input id="email" placeholder="name@example.com" type="email" {...register('email')} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="mobile-no">
                            Mobile Number
                        </Label>
                        <Input id="mobile-no" placeholder="04123456789" type="tel" {...register('mobileNo')} />
                    </div>
                </form>
                <DialogFooter>
                    <Button type="submit" form="customer-form">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


