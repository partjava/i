-- Run against the challenge database. Only migrate the original four legacy cases.
UPDATE star_challenges
SET test_cases = JSON_ARRAY(
    JSON_OBJECT('name', 'parses integer', 'mode', 'function', 'function', 'parse_config_value',
                'args', JSON_ARRAY('100', 'int'), 'expected', 100),
    JSON_OBJECT('name', 'parses bool true', 'mode', 'function', 'function', 'parse_config_value',
                'args', JSON_ARRAY('true', 'bool'), 'expected', JSON_EXTRACT('true', '$')),
    JSON_OBJECT('name', 'parses list[int]', 'mode', 'function', 'function', 'parse_config_value',
                'args', JSON_ARRAY('1,2,3', 'list[int]'), 'expected', JSON_ARRAY(1, 2, 3)),
    JSON_OBJECT('name', 'invalid int raises', 'mode', 'function', 'function', 'parse_config_value',
                'args', JSON_ARRAY('abc', 'int'), 'expectedException', 'ValueError')
)
WHERE slug = 'python-typed-config-value-parser'
  AND JSON_TYPE(test_cases) = 'ARRAY'
  AND JSON_LENGTH(test_cases) = 4
  AND JSON_CONTAINS_PATH(test_cases, 'all',
      '$[0].input.targetType', '$[1].input.targetType', '$[2].input.targetType', '$[3].input.targetType')
  AND JSON_CONTAINS_PATH(test_cases, 'one',
      '$[0].args', '$[1].args', '$[2].args', '$[3].args',
      '$[0].kwargs', '$[1].kwargs', '$[2].kwargs', '$[3].kwargs') = 0;

SELECT slug, JSON_LENGTH(test_cases) AS public_case_count,
       JSON_EXTRACT(test_cases, '$[0].args') AS first_case_args,
       JSON_EXTRACT(test_cases, '$[3].expectedException') AS fourth_case_exception
FROM star_challenges
WHERE slug = 'python-typed-config-value-parser';
