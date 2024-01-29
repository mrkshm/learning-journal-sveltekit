<script lang="ts">
	import { enhance } from '$app/forms';
	import { format } from 'date-fns';
	import type { Writable } from 'svelte/store';
	import type { Entry } from '$lib/db/schema';

	export let isSubmitting: Writable<boolean>;
	export let customEnhance: () => void;

	let textareaRef: HTMLTextAreaElement;

	export const resetTextarea = () => {
		if (textareaRef) {
			textareaRef.value = '';
		}
	};

	export let existingEntry: Entry | null = null;

	const options = [
		{ value: 'work', label: 'Work' },
		{ value: 'learning', label: 'Learning' },
		{ value: 'interesting-thing', label: 'Interesting Thing' }
	];
</script>

<form method="POST" use:enhance={customEnhance} action={existingEntry ? `?/update` : null}>
	<p class="italic">Create an entry</p>
	<fieldset disabled={$isSubmitting} class="disabled:opacity-70">
		<div class="mt-4">
			<input
				type="date"
				required
				name="date"
				value={existingEntry?.date || format(new Date(), 'yyyy-MM-dd')}
				class="text-gray-700"
			/>
		</div>
		<div class="space-x-6 mt-4">
			{#each options as option (option.value)}
				<label>
					<input
						checked={option.value === (existingEntry?.category || 'work')}
						required
						class="mr-1"
						type="radio"
						name="category"
						value={option.value}
					/>
					{option.label}
				</label>
			{/each}
		</div>
		<div class="mt-4">
			<textarea
				bind:this={textareaRef}
				required
				name="description"
				class="width-full text-gray-700"
				placeholder="Write your entry"
				value={existingEntry?.description}
			></textarea>
		</div>
		<div class="mt-1 text-right">
			<button
				type="submit"
				disabled={$isSubmitting}
				class="px-4 py-1 bg-blue-500 text-white font-medium"
			>
				{$isSubmitting
					? existingEntry
						? 'Updating...'
						: 'Saving...'
					: existingEntry
						? 'Update'
						: 'Save'}
			</button>
		</div>
	</fieldset>
</form>
