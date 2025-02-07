import { Patient } from '@/types/patient';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import React from 'react';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff'
    },
    section: {
        marginBottom: 10
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5
    },
    label: {
        fontWeight: 'bold',
        width: 150
    },
    value: {
        flex: 1
    },
    medicationTitle: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    medication: {
        marginLeft: 20,
        marginBottom: 5,
        flexDirection: 'row',
        gap: 10
    },
    medicationName: {
        width: 150
    },
    timingBox: {
        padding: 5,
        marginHorizontal: 5,
        backgroundColor: '#e5e5e5',
        color: '#666666',
        borderRadius: 4,
        width: 120,
        textAlign: 'center'
    },
    activeTimingBox: {
        padding: 5,
        marginHorizontal: 5,
        backgroundColor: '#4ade80',
        color: '#ffffff',
        borderRadius: 4,
        width: 120,
        textAlign: 'center'
    }
});

interface PatientPDFProps {
    patient: Patient;
}
interface MedicationTiming {
    morning: boolean;
    afternoon: boolean;
    night: boolean;
}

interface Medication {
    name: string;
    timing: MedicationTiming;
}

export const PatientPDF: React.FC<PatientPDFProps> = ({ patient }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Patient Details</Text>
            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{patient?.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Age:</Text>
                    <Text style={styles.value}>{patient?.age}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Gender:</Text>
                    <Text style={styles.value}>{patient?.gender}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Blood Group:</Text>
                    <Text style={styles.value}>{patient?.bloodGroup}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Phone Number:</Text>
                    <Text style={styles.value}>{patient?.phone}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Next Visit:</Text>
                    <Text style={styles.value}>{patient?.nextVisit}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Known Allergies:</Text>
                    <Text style={styles.value}>{patient?.knownAllergies}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Reason Of Visit:</Text>
                    <Text style={styles.value}>{patient?.reasonOfVisit}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Diagnosis:</Text>
                    <Text style={styles.value}>{patient?.diagnosis}</Text>
                </View>
            </View>

            <Text style={styles.medicationTitle}>Prescribed Medications:</Text>
            {patient?.prescribedMedication?.map((med: Medication, index) => (
                <View key={index} style={styles.medication}>
                    <Text>{med.name}</Text>
                    <Text style={med.timing?.morning ? styles.activeTimingBox : styles.timingBox}>
                        Morning
                    </Text>
                    <Text style={med.timing?.afternoon ? styles.activeTimingBox : styles.timingBox}>
                        Afternoon
                    </Text>
                    <Text style={med.timing?.night ? styles.activeTimingBox : styles.timingBox}>
                        Night
                    </Text>
                </View>
            ))}
        </Page>
    </Document>
);