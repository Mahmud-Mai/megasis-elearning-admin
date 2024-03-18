import React from 'react'
// import { Col } from 'react-bootstrap';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Props {
    title: string;
    value: string;

}

export default function CounterCard({ title, value }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="uppercase font-bold">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {value}
            </CardContent>
        </Card>

    )
}
