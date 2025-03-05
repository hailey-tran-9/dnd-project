export default function Login() {
  return (
    <div className="h-dvh flex flex-col justify-center items-center">
      <div
        id="loginBox"
        className="w-1/3 bg-emerald-200 rounded-2xl py-8 px-12"
      >
        <h2 className="text-center">Login</h2>
        <form>
          <div className="flex flex-col mb-3">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" className="bg-white mt-1"></input>
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" className="bg-white mt-1"></input>
          </div>

          <div className="flex flex-row justify-between mt-10">
            <button type="button">Create Account</button>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
