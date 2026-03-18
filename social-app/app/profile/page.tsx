"use client";

import { useState } from "react";

export default function Profile() {
const [bio, setBio] = useState("");

const save = async () => {
    await fetch("/api/profile", {
    method: "POST",
    body: JSON.stringify({ bio }),
});
    alert("Saved");
};

return (
    <div>
    <h1>Profile</h1>

    <textarea onChange={(e) => setBio(e.target.value)} />

    <button onClick={save}>Save</button>
    </div>
);
}