<script>
	import '../app.css';
</script>

<div class="mx-auto max-w-7xl p-6">
	<h1 class="text-4xl text-white"><a href="/">Work journal</a></h1>
	<p class="mt-3 text-xl text-gray-400">Doings and learnings. Updated weekly.</p>

	<p>No entries. Write your first journal entry.</p>
	<slot />
</div>

<style>
	html,
	body {
		background-color: black;
		color: white;
	}
</style>
