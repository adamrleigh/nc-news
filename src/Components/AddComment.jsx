import { ButtonGroup, Form } from "react-bootstrap"
import { WriteButton } from "./WriteButton"
import { CancelButton } from "./CancelButton";
import { postComment } from "../Utils/api";


export const AddComment = ( {setState, setComments} ) => {
    return (
        <Form onSubmit={()=>console.log("Done and doner")}> 
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <ButtonGroup>
                <WriteButton size="lg" type="submit"/>
                <CancelButton setState={setState}/>
            </ButtonGroup>
        </Form> 
    )
}
