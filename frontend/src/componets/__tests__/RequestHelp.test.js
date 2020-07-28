import React from "react";
import { render, screen, wait, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RequestHelp from "../RequestHelp";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import io from "socket.io-client";
import { act } from "react-dom/test-utils";
jest.mock("socket.io-client", () => {
  const emit = jest.fn();
  const on = jest.fn();
  const off = jest.fn();
  const socket = { emit, on, off };
  return jest.fn(() => socket);
});



const API = apiURL();

jest.mock("axios");

axios.get()

afterEach(() => {
  jest.clearAllMocks();
});


test("shows text Request Help if no previous request", async () => {
  axios.mockResolvedValue({ data: { openTicket: [] }})


  render(
    <AuthContext.Provider value={{ token: "1234" }}>
      <RequestHelp />
    </AuthContext.Provider>
  );
  await wait(() => expect(axios).toHaveBeenCalledTimes(1));
  const help = await screen.findByText("Request Help");
  expect(help).toBeInTheDocument();
  expect(help.tagName).toBe("BUTTON");
});

test("shows text 'Cancel Request' if previous request", async () => {
    axios.mockResolvedValueOnce({
        data: {
            openTicket: [{id: 1}],
        },
    })
    
    render(
        <AuthContext.Provider value={{ token: "1234" }}>
      <RequestHelp />
    </AuthContext.Provider>
  );
  await wait(() => expect(axios).toHaveBeenCalledTimes(1));
    const help = await screen.findByText("Cancel Request");
    expect(help).toBeInTheDocument();
    expect(help.tagName).toBe("BUTTON");
});

it("makes a post request to create a ticket", async () => {
    axios.mockResolvedValueOnce({
        data: {
            openTicket: [],
        },
    })
    
    render(
        <AuthContext.Provider value={{ token: "1234" }}>
      <RequestHelp />
    </AuthContext.Provider>
  );
  await wait(() => expect(axios).toHaveBeenCalledTimes(1));
  const help = await screen.findByRole("button");
    act(() => {
      fireEvent.click(help);
    });

  expect(axios).toHaveBeenCalledWith({
    method: "post",
    url: `${API}/api/tickets`,
    headers: {
        AuthToken: '1234'
    }, 
    data: {
        body: ""
    }
  });
});

it("makes a delete request to cancel a ticket", async () => {
    axios.mockResolvedValueOnce({
        data: {
            openTicket: [{id: 1}],
        },
    })
    
    render(
        <AuthContext.Provider value={{ token: "1234" }}>
      <RequestHelp />
    </AuthContext.Provider>
  );
  await wait(() => expect(axios).toHaveBeenCalledTimes(1));
  const help = await screen.findByRole("button");
  act(() => {
      fireEvent.click(help)

  })

  expect(axios).toHaveBeenCalledWith({
    method: "delete",
    url: `${API}/api/tickets/close_tickets/1`,
    headers: {
        AuthToken: '1234'
    }
  });
});




// it('creates a socket connection on mount', async () => {
//      render(
//        <AuthContext.Provider value={{ token: "1234" }}>
//          <RequestHelp />
//        </AuthContext.Provider>
//      );

//      expect(io.on).toHaveBeenCalledTimes(1)
// })