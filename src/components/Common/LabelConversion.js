
class LabelConversion {
    static getTimeline = (timeline) => {
        if (timeline === '1') {
            return 'Today'
        } else if (timeline === '2') {
            return 'By tomorrow'
        } else if (timeline === '3') {
            return 'Some day this week'
        }
    }

    static getStatus = (status) => {
        if (status === 'N') {
            return 'New'
        } else if (status === 'P') {
            return 'In progress'
        } else if (status === 'C') {
            return 'Completed'
        }
    }
}

export default LabelConversion;