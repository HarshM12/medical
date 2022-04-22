import React, { useEffect, useState } from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const Contacttbl = () => {

    const [contacts, setcontacts] = useState();
    console.log("contact Data 0" + JSON.stringify(contacts))

    const getContactData = async () => {
        console.log("start get data............");
        const res = await fetch('/contact', {
            credentials: "same-origin",
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            }
        });
        let result = await res.json();
        if (result) {
            setcontacts(result)
        } else {
            return false;
        }
    };
    useEffect(() => {
        console.log("executed only once!");
        getContactData();
    }, []);
    return (
        <>
            <div className="home">
                <div className="featured" style={{ marginTop: "10px" }}>
                    <div className="featuredItem">
                        {contacts && contacts.map((contact) => {
                            return (
                                <>
                                    <Card>
                                        <CardBody>
                                            <h5><strong> Name : {contact.name}</strong></h5>
                                            <CardTitle></CardTitle>
                                            <h5><strong> Email Address : {contact.email}</strong></h5>
                                            <CardTitle></CardTitle>
                                            <h5><strong> Subject : {contact.subject}</strong></h5>
                                            <h5><strong> Message : {contact.message}</strong></h5>
                                            <CardSubtitle></CardSubtitle>
                                        </CardBody>
                                    </Card>
                                </>
                            )
                        })

                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Contacttbl;

