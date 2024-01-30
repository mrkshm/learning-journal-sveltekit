<script lang="ts">
	import type { ActionData } from '../$types';

	export let form: ActionData;
</script>

<h1 class="mt-8 text-xl">Login</h1>

<form class="text-gray-900 space-y-4 mt-6" action="?/login" method="POST">
	<div>
		<label>
			<input placeholder="email" id="email" name="email" type="text" required />
		</label>
	</div>

	<div>
		<label
			><input
				placeholder="password"
				id="password"
				name="password"
				type="password"
				required
			/></label
		>
	</div>

	<button type="submit">Log in</button>
</form>
