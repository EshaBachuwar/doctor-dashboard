import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import React from 'react';
import { AppDispatch, store } from '@/store';
import { Patient } from '@/types/patient';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica'
    },
    header: {
        borderBottom: 2,
        borderColor: '#2563eb',
        paddingBottom: 10,
        marginBottom: 20
    },
    hospitalName: {
        fontSize: 24,
        color: '#2563eb',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5
    },
    hospitalInfo: {
        fontSize: 10,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 3
    },
    doctorInfo: {
        fontSize: 12,
        color: '#1e293b',
        textAlign: 'center'
    },
    patientSection: {
        marginBottom: 20,
        borderBottom: 1,
        borderColor: '#e2e8f0',
        paddingBottom: 10
    },
    patientRow: {
        flexDirection: 'row',
        marginBottom: 5,
        fontSize: 11
    },
    label: {
        width: 100,
        color: '#64748b'
    },
    value: {
        flex: 1,
        color: '#1e293b'
    },
    rxSymbol: {
        fontSize: 24,
        color: '#2563eb',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    medicationSection: {
        marginTop: 20
    },
    medicationItem: {
        marginBottom: 15,
        paddingLeft: 20
    },
    medicationName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 5
    },
    timingRow: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 5,
        gap: 3
    },
    timingBox: {
        padding: 4,
        backgroundColor: '#f1f5f9',
        color: '#64748b',
        fontSize: 9,
        width: 50,
        textAlign: 'center',
        borderRadius: 2
    },
    activeTimingBox: {
        padding: 4,
        backgroundColor: '#2563eb',
        color: '#ffffff',
        fontSize: 9,
        width: 50,
        textAlign: 'center',
        borderRadius: 2
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 40,
        right: 40
    },
    signatureSection: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 40,
        paddingTop: 20,
        borderTop: 1,
        borderColor: '#e2e8f0'
    },
    signatureBox: {
        width: 200,
        textAlign: 'center'
    },
    signatureLine: {
        borderTop: 1,
        borderColor: '#94a3b8',
        marginTop: 40,
        marginBottom: 5
    },
    signatureText: {
        fontSize: 10,
        color: '#64748b',
        textAlign: 'center'
    },
    dateText: {
        position: 'absolute',
        top: 120,
        right: 40,
        fontSize: 10,
        color: '#64748b'
    }
});

interface PatientPDFProps {
    patient: Patient;
}

export const PatientPDF: React.FC<PatientPDFProps> = ({ patient }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.hospitalName}>Carenet Hospital</Text>
                <Text style={styles.hospitalInfo}>Phone: {store.getState().auth.doctor?.phone} • Email: {store.getState().auth.doctor?.email}</Text>
                <Text style={styles.doctorInfo}>{store.getState().auth.doctor?.name}, {store.getState().auth.doctor?.specialization} </Text>
            </View>

            <Text style={styles.dateText}>Date: {new Date().toLocaleDateString()}</Text>

            <View style={styles.patientSection}>
                <View style={styles.patientRow}>
                    <Text style={styles.label}>Patient Name:</Text>
                    <Text style={styles.value}>{patient?.name}</Text>
                </View>
                <View style={styles.patientRow}>
                    <Text style={styles.label}>Age/Gender:</Text>
                    <Text style={styles.value}>{patient?.age} years / {patient?.gender}</Text>
                </View>
            </View>

            <Text style={styles.rxSymbol}>℞</Text>

            <View style={styles.medicationSection}>
                {patient?.prescribedMedication?.map((med, index) => (
                    <View key={index} style={styles.medicationItem}>
                        <Text style={styles.medicationName}>{index + 1}. {med.name}</Text>
                        <View style={styles.timingRow}>
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
                    </View>
                ))}
            </View>

            <View style={styles.footer}>
                <View style={styles.signatureSection}>
                    <View style={styles.signatureBox}>
                        <View style={styles.signatureLine} />
                        <Text style={styles.signatureText}>Doctor's Signature</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);