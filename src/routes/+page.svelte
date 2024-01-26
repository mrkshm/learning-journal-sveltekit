<script lang="ts">
	import { enhance } from '$app/forms';
	import { format, parseISO } from 'date-fns';
	let isSubmitting = false;
	let textareaRef: HTMLTextAreaElement;
	import type { Week } from './+page.server';
	export let data: { weeks: Week[] };

	const customEnhance = () => {
		// Here is what's happening
		// This function is called just before the form is submitted
		isSubmitting = true;

		return async () =>
			// { result, update }
			{
				// This callback is called after the form submission is complete
				isSubmitting = false;
				if (textareaRef) {
					textareaRef.value = '';
				}
			};
	};
</script>

<div class="mx-auto max-w-7xl p-6">
	<h1 class="text-4xl text-white">Work journal</h1>
	<p class="mt-3 text-xl text-gray-400">Doings and learnings. Updated weekly.</p>

	<p>No entries. Write your first journal entry.</p>
	<div class="my-8 border p-2">
		<form method="POST" use:enhance={customEnhance}>
			<p class="italic">Create an entry</p>
			<fieldset disabled={isSubmitting} class="disabled:opacity-70">
				<div class="mt-4">
					<input
						type="date"
						required
						name="date"
						value={format(new Date(), 'yyyy-MM-dd')}
						class="text-gray-700"
					/>
				</div>
				<div class="space-x-6 mt-4">
					<label>
						<input required class="mr-1" type="radio" checked={true} name="category" value="work" />
						Work
					</label>
					<label>
						<input class="mr-1" type="radio" name="category" value="learning" />
						Learning
					</label>
					<label>
						<input class="mr-1" type="radio" name="category" value="interesting-thing" />
						Interesting Thing
					</label>
				</div>
				<div class="mt-4">
					<textarea
						bind:this={textareaRef}
						required
						name="description"
						class="width-full text-gray-700"
						placeholder="Write your entry"
					></textarea>
				</div>
				<div class="mt-1 text-right">
					<button
						type="submit"
						disabled={isSubmitting}
						class="px-4 py-1 bg-blue-500 text-white font-medium"
					>
						{isSubmitting ? 'Saving...' : 'Save'}
					</button>
				</div>
			</fieldset>
		</form>
	</div>
	<div class="space-y-4">
		{#each data.weeks as week}
			<div class="mt-8">
				<h3 class="font-bold">Week of {format(parseISO(week.dateString), 'MMMM do')}</h3>
				<div class="mt-3 space-y-4">
					{#if week.work.length > 0}
						<div>
							<p>Work</p>
							<ul class="ml-8 list-disc">
								{#each week.work as workEntry (workEntry.id)}
									<li>{workEntry.description}</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if week.learnings.length > 0}
						<div>
							<p>Learnings</p>
							<ul class="ml-8 list-disc">
								{#each week.learnings as learningEntry (learningEntry.id)}
									<li>{learningEntry.description}</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if week.interestingThings.length > 0}
						<div>
							<p>Learnings</p>
							<ul class="ml-8 list-disc">
								{#each week.interestingThings as interestingThingEntry (interestingThingEntry.id)}
									<li>{interestingThingEntry.description}</li>
								{/each}
							</ul>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
