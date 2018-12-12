export default class Team {
	constructor(config) {
		this.id = config.id
		this.resources = []
		this.members = []
	}

	addMember(person) {
		this.members.push(person)
	}
}
