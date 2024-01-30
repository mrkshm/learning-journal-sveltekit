<script lang="ts">
	import { writable } from 'svelte/store';
	import { customEnhance as importedCustomEnhance } from '$lib/custom-enhance';
	import EntryListItem from '../components/entry-list-item.svelte';

	import { page } from '$app/stores';

	import { format, parseISO } from 'date-fns';
	let isSubmitting = writable(false);
	import type { Week } from './+page.server';
	import EntryForm from '../components/entry-form.svelte';
	export let data: { weeks: Week[] };

	let entryFormComponent: EntryForm;

	function customEnhanceWrapper() {
		return importedCustomEnhance({ isSubmitting, entryFormComponent });
	}
</script>

<div>
	{#if $page.data.user.isAdmin}
		<div class="my-8 border p-2">
			<EntryForm {isSubmitting} customEnhance={customEnhanceWrapper} />
		</div>
	{/if}
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
									<EntryListItem entry={workEntry} />
								{/each}
							</ul>
						</div>
					{/if}
					{#if week.learnings.length > 0}
						<div>
							<p>Learnings</p>
							<ul class="ml-8 list-disc">
								{#each week.learnings as learningEntry (learningEntry.id)}
									<EntryListItem entry={learningEntry} />
								{/each}
							</ul>
						</div>
					{/if}
					{#if week.interestingThings.length > 0}
						<div>
							<p>Learnings</p>
							<ul class="ml-8 list-disc">
								{#each week.interestingThings as interestingThingEntry (interestingThingEntry.id)}
									<EntryListItem entry={interestingThingEntry} />
								{/each}
							</ul>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
