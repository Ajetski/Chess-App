import React from "react";
import { Route, Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";

// test utils file
export function MatchRouter(
    ui: any,
    route: string = "/",
    path: string = "/"
) {
    const history = createMemoryHistory({ initialEntries: [route] });
    return {
        ...render(
            <Router history={history}>
                <Route path={path}>{ui}</Route>
            </Router>),
        history
    };
}
