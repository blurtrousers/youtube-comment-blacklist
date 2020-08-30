// ==UserScript==
// @name         YouTube Comment Blacklist
// @namespace    https://github.com/NatoBoram/youtube-comment-blacklist
// @version      0.0.0
// @license      GPL-3.0-or-later
// @description  Removes unoriginal YouTube comments.
// @author       NatoBoram
// @supportURL   https://github.com/NatoBoram/youtube-comment-blacklist/issues
// @include      https://www.youtube.com/watch*
// @grant        none
// ==/UserScript==

(() => {
	"use strict";

	const bannedWords = [
		"always has been",
		"anyone ?",
		"anyone?",
		"can't hurt you",
		"for the likes",
		"funniest shit i've ever seen",
		"he turned himself into a",
		"i felt that",
		"let's be honest",
		"modern problems",
		"nobody's going to mention",
		"of likes",
		"require modern solutions",
		"simp",
		"speaking the language of gods",
		"tiktok",
		"underrated comment",
	];

	const bannedRegexes = [
		/\d+ likes/i,
		/^(\w ?)+:(\n| )/im,
		/^\d+% (\w ?)+\n/im
	];

	// Wait for the comment section to load.
	const interval = setInterval(() => {
		const comments = document.querySelector("ytd-comments");
		if (!comments) { return; }
		clearInterval(interval);

		new MutationObserver(() => {
			comments.querySelectorAll("ytd-comment-thread-renderer").forEach(thread => {
				thread.querySelectorAll("ytd-comment-renderer").forEach(comment => {
					const textContent = comment.querySelector("ytd-expander yt-formatted-string#content-text").textContent.toLowerCase();
					if (bannedWords.some(word => textContent.includes(word)) || bannedRegexes.some(regex => textContent.match(regex))) {
						console.log("Removed comment :", textContent);
						return comment.remove();
					}
				});
			});
		}).observe(comments, { childList: true, subtree: true });
	}, 1000);

})();
