<script>
</script>

<div class="mx-auto max-w-7xl p-6">
	<h1 class="text-4xl text-white">Work journal</h1>
	<p class="mt-3 text-xl text-gray-400">Doings and learnings. Updated weekly.</p>

	<p>No entries. Write your first journal entry.</p>
	<div class="my-8 border p-2">
		<form method="POST">
			<p class="italic">Create an entry</p>
			<div>
				<div class="mt-4">
					<input type="date" name="date" class="text-gray-700" />
				</div>
				<div class="space-x-6 mt-4">
					<label>
						<input class="mr-1" type="radio" name="category" value="work" />
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
						name="description"
						class="width-full text-gray-700"
						placeholder="Write your entry"
					></textarea>
				</div>
				<div class="mt-1 text-right">
					<button class="px-4 py-1 bg-blue-500 text-white font-medium"> Submit </button>
				</div>
			</div>
		</form>
	</div>
</div>
