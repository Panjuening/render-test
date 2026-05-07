if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

if(process.argv.length===3){
console.log('phonebook:')
Person.find({}).then(result =>{
	result.forEach(person=>{
		console.log(`${person.name} ${person.number}`)
	})
	mongoose.connection.close()
})
}else if(process.argv.length === 5)
{
	const name =process.argv[3]
	const number=process.argv[4]

	const person =new Person({
	name:name,
	number:number,
	})

person.save().then(result => {
  console.log(`added ${result.name} number ${result.number} to phonebook`)
  mongoose.connection.close()
})
}else
{
  console.log('Usage: node mongo.js <password> [<name> <number>]')
  mongoose.connection.close()
}

