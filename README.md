# LIDO DEMO

Routes:
1. '/add_student' - post route accepts studentId, student and class as mandatory params. section can be passed if needed
2. '/school_data' - get route to get complete school json.

There is no db implementation. Below are details of local variables used as db:
1. One json object to keep track of all school data - school. School has classes 1 to 12, anything outside is invalid. Each class has sections A to E, anything other than this is invalid.
2. Another json object to keep track of all student ids entered in school json till now.
