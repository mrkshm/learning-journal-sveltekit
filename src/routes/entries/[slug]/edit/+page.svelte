<script lang="ts">
	import { writable } from 'svelte/store';
	import { customEnhance as importedCustomEnhance } from '$lib/custom-enhance';
	import { type Entry } from '$lib/db/schema';
	import EntryForm from '../../../../components/entry-form.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	export let data: { entry: Entry };
	let isSubmitting = writable(false);
	let entryFormComponent: EntryForm;

	function customEnhanceWrapper() {
		return importedCustomEnhance({ isSubmitting, entryFormComponent });
	}
</script>

<h3>Edit Entry</h3>
<EntryForm existingEntry={data.entry} {isSubmitting} customEnhance={customEnhanceWrapper} />
<form method="POST" action="?/delete">
	<button type="submit" class="text-gray-500 underline">Delete this entry...</button>
</form>
