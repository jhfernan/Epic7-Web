export default function({ error, redirect, store }) {
	if (!store.state.auth.loggedIn) {
		return redirect("/login");
	} else if (!store.state.auth.user.admin) {
		return error({
			statusCode: 403,
			message: "You do not have permission to access this resource"
		});
	}
}
