//Used by Profile.tsx component
export default function ProfileAccount() {
  return (
    <form
      id="profile-img"
      className="flex w-full  flex-col items-center justify-center gap-16 text-defaultblue"
    >
      <div className="flex items-center gap-4">
        <label htmlFor="username" className="flex min-w-[5em] justify-end">
          Username:{" "}
        </label>
        <input
          id="username"
          type="text"
          placeholder="username"
          className="min-w-[5em] rounded-md border-2 px-2 py-1"
        />
        <button className="hidden">Save</button>
      </div>
      <div className="flex items-center gap-4">
        <label htmlFor="email" className="flex min-w-[5em] justify-end">
          Email:{" "}
        </label>
        <input
          id="email"
          type="email"
          placeholder="name@email.com"
          className="min-w-[5em] rounded-md border-2 px-2 py-1"
        />
        <button className="hidden">Save</button>
      </div>
      <div className="flex items-center gap-4">
        <label htmlFor="username" className="flex min-w-[5em] justify-end">
          Password:{" "}
        </label>
        <input
          id="username"
          type="password"
          placeholder="********"
          className="min-w-[5em] rounded-md border-2 px-2 py-1"
        />
        <button className="hidden">Save</button>
      </div>
      <button className="rounded-lg border-2 px-4 py-2 text-red-600 hover:border-red-300 text-xs">
          Delete Account
        </button>
    </form>
  );
}
