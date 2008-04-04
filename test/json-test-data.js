/*
Author: Oliver Steele
Copyright: Copyright 2006 Oliver Steele.  All rights reserved.
Homepage: http://osteele.com/sources/openlaszlo/json
License: MIT License.
*/

// These are used to test both encoding and decoding.  This is a
// flattened list of [value, string] pairs --- flattened, so that it's
// easier to maintain the test data.
var twoWayTests = [
    false, 'false',
    true, 'true',
    null, 'null',
    // numbers
    123, '123',
    -123, '-123',
    123.4, '123.4',
    -123.4, '-123.4',
    // strings
    "", '""',
    "abc", '"abc"',
    "\nabc", '"\\nabc"',
    "abc\n", '"abc\\n"',
    "a\nb\nc", '"a\\nb\\nc"',
    "a\\b\"c\n\r\f\t\b", '"a\\\\b\\\"c\\n\\r\\f\\t\\b"',
    "\u0123", '"\\u0123"',
    // arrays
    [], '[]',
    [1], '[1]',
    [1,2], '[1,2]',
    [true,false,null,"abc"], '[true,false,null,"abc"]',
    // objects
    {}, '{}',
    {a: 1}, '{"a":1}',
    {a: 1, b: 2}, '{"a":1,"b":2}',
    {a: 1, b: true, c: false, d: null}, '{"a":1,"b":true,"c":false,"d":null}'
    ];

var encodingTests = [
    NaN, 'null',
    Infinity, 'null',
    -Infinity, 'null'
	];

// These can only be used to test decoding, since the stringified
// expressions have simpler normal forms (e.g., 123e1 is stringified
// as 1230).
var decodingTests = [
	1230, '123e1',
	1230, '123e+1',
	12.3, '123e-1',
	1230, '123E1',
	1230, '123E+1',
	12.3, '123E-1',
	-1230, '-123e1',
	1234, '123.4e1',
	1234, '123.4e+1',
	12.34, '123.4e-1',
	1234, '123.4E1',
	1234, '123.4E+1',
	12.34, '123.4E-1',
	1000000, '0.000001e12'
    ];

// Test whitespace in various positions.  Like decodingTests, these 
var whitespaceTests = [
	123, ' 123',
	123, ' 123 ',
	[1,2], ' [ 1 , 2 ] ',
     {a: 1, b: 2}, ' { "a" : 1 , "b" : 2 } '
     ];

// Flattened list of [expr, errorMessage, errorIndex].  errorIndex is
// often off by one, but is included here to verify that it doesn't
// get worse.
var parseErrorTests = [
    '', 'empty expression', 0,
    ' ', 'empty expression', 1,
    '-', 'invalid number', 1,
    '.1', "invalid character: '.'", 1,
    '123.4.5', 'extra characters at the end of the string', 6,
    '123e1e1', 'extra characters at the end of the string', 6,
    '123a', 'extra characters at the end of the string', 4,
    '"abc', "umatched '\"'", 1,
    '"abc\\"', "umatched '\"'", 1,
    '"abc\\u"', "invalid unicode digit: '\"'", 1,
    '"abc\\udefg"', "invalid unicode digit: 'g'", 1,
    '[', "unmatched '['", 1,
    ']', "invalid character: ']'", 1,
    '[,]', "extra ','", 2,
    '[1,]', "extra ','", 3,
    '[,1]', "extra ','", 2,
    '[1 2]', "invalid character: ']'", 5,
    '1 2', "extra characters at the end of the string", 3,
    '{,}', "extra ','", 2,
    '{"a":1,}', "invalid character: '}'", 8,
    '{,"a":1}', "missing ':'", 6,
    '{"a":1 "b":2}', "invalid character: 'b'", 9
    ];
