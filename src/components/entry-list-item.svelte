<script lang="ts">
	import { type Entry } from '$lib/db/schema';
	export let entry: Entry;
</script>

<li class="group">
	{entry.description}<a
		href={`entries/${entry.id}/edit`}
		class="opacity-0 group-hover:opacity-100 ml-2 text-blue-500">Edit</a
	>
</li>
