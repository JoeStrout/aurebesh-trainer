// This program sorts the words from wordlist-base.txt, and 
// also adds the letters as needed so that you always know
// the letters before you have to learn the words.  (With the
// exception of ?, CHECK, GOOD, and MISSED, which are needed
// just to work the app.)
//
// This program is written in MiniScript, the coolest little
// language you've never heard of.  See: https://miniscript.org

words = file.readLines("wordlist-base.txt")
letters = "ANITOESRHDLUCMFYWGPBVXKQJZ"	// (in rough frequency order)

known = []

allLettersKnown = function(word)
	for c in word
		if known.indexOf(c) == null then return false
	end for
	return true
end function

output = ["?", "CHECK", "GOOD", "MISSED"]
for letter in letters
	output.push letter
	known.push letter
	i = 0
	while i < words.len
		if allLettersKnown(words[i]) then
			output.push words[i]
			words.remove i
		else
			i += 1
		end if
	end while
end for

print output
