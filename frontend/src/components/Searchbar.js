import React from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from 'react-bootstrap/Button'
import {
    CDBSidebarMenuItem
} from 'cdbreact';

const Searchbar = () => {
    const input = React.useRef();

    return (
        <div>
            <CDBSidebarMenuItem>
                <Form
                    onSubmit={(sub) => {
                        sub.preventDefault();
                    }}>
                    <FormControl id="searchbox" type="text" ref={input} placeholder="Search Website"
                        onKeyPress={(event) => {
                            if (event.key === "Enter")
                                if (input.current.value.toString())
                                    window.location.href = "/search/" + input.current.value.toString();
                        }}>
                    </FormControl>
                </Form></CDBSidebarMenuItem>
            <CDBSidebarMenuItem>
                <Button variant="outline-light"
                    onClick={() => window.location.href = "/search/" + input.current.value.toString()}
                ><i className="fas fa-search"></i></Button>
            </CDBSidebarMenuItem>
        </div>
    );
}

export default Searchbar;
