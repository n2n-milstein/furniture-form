PROCESS:

0. (DONE) Configure Vuetify
1. Create form with inputs
2. Deploy site
3. Add functionality (ie. connect to database)
4. Test
5. Test rules and configure appropriately
6. Style tweaks

TODO:
- add id field, images, timing
- wipe fields and redirect?? when add item button is clicked
    - customize fields for button depending on class


FEATURES:
- submit directly to 'pending' collection in Firestore
    -  allows anyone to submit items
- add multiple items without typing in contact info multiple times
- submitted via submit button
    - MOVE TO COMPONENT AND SEND DONOR INFO AS PROPS
- display different form based on selected value
    - previously entered info needs to be stored...
- automated email
    - per item? or per submission?
- require all fields to be filled before submitting

QUESTIONS:
- do attributes go into PhysicalAttr?
- how to pass up data...with emit?
- save attribute values & how to use Furniture.ts
    - dict or class?
