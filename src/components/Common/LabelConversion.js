
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
        if (status === '1') {
            return 'New'
        } else if (status === '2') {
            return 'In progress'
        } else if (status === '3') {
            return 'Completed'
        }
    }
}

export default LabelConversion;